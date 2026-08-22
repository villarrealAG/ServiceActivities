import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, title = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic custom syntax highlighting for React/JS keywords
  const highlightCode = (rawCode) => {
    const lines = rawCode.split('\n');
    return lines.map((line, idx) => {
      // Escape HTML special characters
      let escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Highlight keywords
      const keywords = ['const', 'let', 'var', 'function', 'return', 'import', 'from', 'export', 'default', 'if', 'else', 'try', 'catch', 'finally', 'await', 'async', 'new', 'throw'];
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        escaped = escaped.replace(regex, `<span class="keyword">${keyword}</span>`);
      });

      // Highlight strings
      escaped = escaped.replace(/(['"`])(.*?)\1/g, '<span class="string">$&</span>');

      // Highlight operators
      const operators = ['=&gt;', '===', '==', '=', '\\+', '-', '\\*', '/', '&&', '\\|\\|', '\\?'];
      operators.forEach(op => {
        const regex = new RegExp(op, 'g');
        escaped = escaped.replace(regex, `<span class="operator">$&</span>`);
      });

      // Highlight functions
      escaped = escaped.replace(/\b(\w+)(?=\()/g, '<span class="function">$1</span>');

      // Highlight comments
      if (escaped.includes('//')) {
        const parts = escaped.split('//');
        escaped = parts[0] + '<span class="comment">//' + parts.slice(1).join('//') + '</span>';
      }

      return (
        <div key={idx} dangerouslySetInnerHTML={{ __html: escaped || ' ' }} />
      );
    });
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <span className="code-title">{title}</span>
        <button className="btn btn-outline" onClick={copyToClipboard} style={{ padding: '4px 8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {copied ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>
      <pre className="code-content">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
