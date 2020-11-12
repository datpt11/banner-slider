export interface GetInstaContentProps {
  text: string;
  hashtags?: string[];
  linkColor?: string;
  textColor?: string;
}

export default function getInstaContent({ text, hashtags = [], linkColor, textColor }: GetInstaContentProps) {
  const regExpUserTag = /@(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}/g;
  return `
    <div ${!!textColor ? `style="color: ${textColor}"` : ''}>
      ${hashtags
        .reduce((str, tag) => {
          // Tìm các tag có đằng sau là tag khác hoặc dấu cách hoặc kết thúc đoạn text
          const regExpHashTag = new RegExp(`${tag}(?=#|\\s|$)`, 'g');
          return str.replace(
            regExpHashTag,
            `<a ${!!linkColor ? `style="color: ${linkColor}"` : ''} href="https://www.instagram.com/explore/tags/${tag.replace(
              /^#/g,
              '',
            )}" target="_blank">${tag}</a>`,
          );
        }, text)
        .replace(
          regExpUserTag,
          userName =>
            `<a ${!!linkColor ? `style="color: ${linkColor}"` : ''}  href="https://www.instagram.com/${userName.replace(
              /(^@|\.$)/g,
              '',
            )}" target="_blank">${userName}</a>`,
        )}
    </div>
  `;
}
