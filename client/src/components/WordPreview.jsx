import { useState, useEffect } from 'react';
import mammoth from 'mammoth';

const WordPreview = ({ blob }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const convertToHtml = async (blob) => {
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    };

    if (blob) {
      convertToHtml(blob);
    }
  }, [blob]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default WordPreview;
