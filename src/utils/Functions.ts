import { configs } from "shared/content/Content";

export const open = (link: string) => window.open(link, "_blank");

// Utility function to resolve asset paths correctly
export const resolveAssetPath = (assetPath: string) => {
    // Use process.env.PUBLIC_URL to ensure correct path in both dev and production
    const publicUrl = process.env.PUBLIC_URL || '';
    // Remove leading slash from assetPath if publicUrl is empty to avoid double slashes
    const cleanAssetPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
    return publicUrl ? `${publicUrl}/${cleanAssetPath}` : `/${cleanAssetPath}`;
};

export const onResumeOpen = () => {
    // Use resolveAssetPath for consistent asset handling
    const resumePath = resolveAssetPath(configs.common.resume);
    open(resumePath);
};

export const onMailTo = () => {
    open("mailto:" + configs.common.email);
};
