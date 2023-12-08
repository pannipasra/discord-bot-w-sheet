// const data = [
//     ['JPY -> THB', 'THB -> JPY'],
//     ['0.2453879', '4.074747']
// ];

export function createMarkdownTable(data) {
    let markdownTable = '|';

    // Adding header row
    markdownTable += data[0].join('|');
    markdownTable += '|\n';

    // Adding separator row
    markdownTable += '|';
    markdownTable += Array(data[0].length).fill('---').join('|');
    markdownTable += '|\n';

    // Adding content rows
    for (let i = 1; i < data.length; i++) {
        markdownTable += '|';
        markdownTable += data[i].join('|');
        markdownTable += '|\n';
    }

    return markdownTable;
}

export function createPlaintextTable(data) {
    let table = '';

    // Function to create a row separator
    function createRowSeparator(columnWidths) {
        let separator = '+';
        columnWidths.forEach(width => {
            separator += '-'.repeat(width + 2) + '+';
        });
        separator += '\n';
        return separator;
    }

    // Calculate column widths
    const columnWidths = data[0].map((_, colIndex) => {
        let maxWidth = 0;
        data.forEach(row => {
            const cellWidth = row[colIndex].length;
            maxWidth = cellWidth > maxWidth ? cellWidth : maxWidth;
        });
        return maxWidth;
    });

    // Create table header
    table += createRowSeparator(columnWidths);
    data[0].forEach((header, index) => {
        table += `| ${header.padEnd(columnWidths[index])} `;
    });
    table += '|\n';
    table += createRowSeparator(columnWidths);

    // Create table rows
    for (let i = 1; i < data.length; i++) {
        data[i].forEach((cell, index) => {
            table += `| ${cell.padEnd(columnWidths[index])} `;
        });
        table += '|\n';
        table += createRowSeparator(columnWidths);
    }

    return table;
}

export function createMarkdownList(data) {
    let markdown = `* Currency Alert\n`;

    data.forEach((row) => {
        const [currencyPair, value] = row;
        markdown += `  - ${currencyPair}: ${value}\n`;
    });

    return markdown;
}
