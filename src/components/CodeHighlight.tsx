import { Highlight, themes } from "prism-react-renderer";

interface CodeHighlightProps {
  code: string;
  isDark?: boolean;
}

export function CodeHighlight({ code, isDark = true }: CodeHighlightProps) {
  const theme = isDark ? themes.shadesOfPurple : themes.vsLight;

  return (
    <Highlight theme={theme} code={code} language="javascript">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="code-highlight"
          style={{
            ...style,
            background: "transparent",
            margin: 0,
            padding: 0,
            overflow: "visible",
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
