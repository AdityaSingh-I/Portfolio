import { FC, useEffect, useState } from "react";

import { Text, Stack, StyleProps, Link, UnorderedList } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import common from "content/common/common.json";
import landing from "content/landing/landing-config.json";
import featuredProjects from "content/featured-projects/featured-projects-config.json";
import otherProjects from "content/other-projects/other-projects-config.json";
import about from "content/about/about-config.json";



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

const contentData = {
    [MarkdownFile.Landing]: `Welcome 👋 I'm Adi, a Senior Analyst in the Insights and Solutions team at Liberty Mutual, specializing in data analytics, business insights, and strategy. I have a Master's in Business Analytics from Babson College and a passion for leveraging data-driven insights to optimize business performance and decision-making.

I'm currently working with:

-   Tableau
-   SQL
-   Python
-   R
-   PowerBI
-   Snowflake`,
    [MarkdownFile.About]: `Hi there ✌️ nice to meet you! I'm **Aditya Jit Singh**, a _Business Intelligence Engineer & Analytics Professional_ currently working at **Liberty Mutual** in Seattle.

I have a deep passion for **data, analytics, and storytelling**, blending my expertise in **SQL, Python, and visualization tools like Power BI & Tableau** to uncover insights that drive big decisions. Whether it's optimizing business strategy or running A/B tests, I thrive on turning raw numbers into **actionable insights** (kind of like magic, but with data instead of a wand 🪄).

Beyond work, I am a **foodie on a mission**—always hunting down the best restaurants, and if there's sushi involved, I'm **already there** 🍣. My **dog, Toffee**, keeps me on my toes, ensuring my life isn't all just SQL queries and dashboards. When I'm not analyzing data or chasing Toffee around, you'll find me **traveling, lifting at the gym, exploring new cities, and always looking for bigger and better opportunities.**

Oh, and if you ever want to talk about **business, tech, or real estate investing**, I'm your guy! 🚀`,
};

export const useContent = (fileName: MarkdownFile) => {
    const [data, setData] = useState<State>({ landing: "", about: "" });

    useEffect(() => {
        setData((data) => ({ ...data, [fileName]: contentData[fileName] }));
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
                        const { ordered, ...ulProps } = props;

                        return (
                            <UnorderedList
                                {...ulProps}
                                data-aos="fade"
                                listStylePosition="inside"
                                display="grid"
                                gridTemplateColumns="repeat(2, 1fr)"
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
