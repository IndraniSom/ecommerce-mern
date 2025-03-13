import Markdown from "react-markdown";

const MarkdownComp = ({ children }: { children: any }) => {
  return <Markdown>{children}</Markdown>;
};

export default MarkdownComp;
