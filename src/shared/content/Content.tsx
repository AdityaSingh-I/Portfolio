import { FC, useEffect, useState } from "react";

import { Text, Stack, StyleProps, Link, UnorderedList } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import common from "content/common/common.json";
import landing from "content/landing/landing-config.json";
import featuredProjects from "content/featured-projects/featured-projects-config.json";
import otherProjects from "content/other-projects/other-projects-config.json";
import about from "content/about/about-config.json";

import LandingMd from "content/landing/landing.md";
import AboutMd from "content/about/about.md";

export const configs = {
    common,
    landing,
    featuredProjects,
    otherProjects,
    about,
};

interface State {
    landing: string;
    about: string;
}

export enum MarkdownFile {
    Landing = "landing",
    About = "about",
}

const Mapper = {
    [MarkdownFile.Landing]: LandingMd,
    [MarkdownFile.About]: AboutMd,
};

export const useContent = (fileName: MarkdownFile) => {
    const [data, setData] = useState<State>({ landing: "", about: "" });

    useEffect(() => {
        fetch(Mapper[fileName])
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${fileName}: ${res.status}`);
                }
                return res.text();
            })
            .then((text) => setData((data) => ({ ...data, [fileName]: text })))
            .catch((error) => {
                console.error(`Error loading ${fileName}:`, error);
                // Fallback content for Safari compatibility
                if (fileName === MarkdownFile.Landing) {
                    setData((prevData) => ({ ...prevData, landing: "Welcome! I'm Aditya Singh, a Senior Analyst at Liberty Mutual." }));
                } else if (fileName === MarkdownFile.About) {
                    setData((prevData) => ({ ...prevData, about: "Hi there! Nice to meet you! I'm Aditya Jit Singh." }));
                }
            });
    }, [fileName]);

    return data;
};

interface Props extends StyleProps {
    children?: string;
}

export const Content: FC<Props> = ({ children, ...rest }) => {
    return (
        <Stack spacing="4">
            <ReactMarkdown
                components={{
                    p: ({ node, ...props }) => <Text {...rest} {...props} />,
                    a: ({ node, ...props }) => (
                        <Link href={props.href} target="_blank" color="primary.200" {...props} />
                    ),
                    ul: ({ node, ...props }) => {
                        const { ordered, ...rest } = props;

                        return (
                            <UnorderedList
                                {...rest}
                                data-aos="fade"
                                listStylePosition="inside"
                                display="grid"
                                style={{
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "8px"
                                }}
                                listStyleType="'‣ '"
                                fontWeight="600"
                            />
                        );
                    },
                    li: ({ node, ...props }) => {
                        const { ordered, ...rest } = props;

                        return <li data-aos="flip-up" data-aos-delay={props.index * 100 + 400} {...rest} />;
                    },
                }}
            >
                {children as string}
            </ReactMarkdown>
        </Stack>
    );
};
