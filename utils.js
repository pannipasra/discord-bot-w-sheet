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

// const data = [
//     ['JPY -> THB', 'THB -> JPY'],
//     ['0.2453879', '4.074747']
// ];

export function extractCurrencyData(data) {
    let _JPY2THB = '';
    let _THB2JPY = '';
    let valJPY2THB = '';
    let valTHB2JPY = '';

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        switch (i) {
            case 0:
                const [JPY2THB, THB2JPY] = row;
                _JPY2THB += ` - ${JPY2THB}: `;
                _THB2JPY += ` - ${THB2JPY}: `;
                break;
            default:
                const [valJPY, valTHB] = row;
                valJPY2THB += `${valJPY}`;
                valTHB2JPY += `${valTHB}`;
                break;
        }
    }

    return {
        valJPY2THB,
        valTHB2JPY,
    };
}

export function createMarkdownFromData(valJPY2THB, valTHB2JPY) {
    const markdown = `* Currency Alert\n`;

    const _JPY2THB = ` - JPY2THB: ${valJPY2THB}`;
    const _THB2JPY = ` - THB2JPY: ${valTHB2JPY}`;

    return `${markdown}${_JPY2THB}\n${_THB2JPY}\n`;
}



export function checkValJPY2THB(valJPY2THB, _tempValJPY2THB, criteriaDefualt = 0.245) {
    if (valJPY2THB > criteriaDefualt) {
        _tempValJPY2THB = valJPY2THB; // Assign valJPY2THB to _tempValJPY2THB
        let valString = valJPY2THB.toString();
        let tempValString = _tempValJPY2THB.toString();

        if (valString.length >= 5 && tempValString.length >= 5) {
            for (let i = 4; i < 8; i++) {
                let valDigit = parseInt(valString.charAt(i));
                let tempDigit = parseInt(tempValString.charAt(i));

                if (valDigit > tempDigit) {
                    return {
                        isOk: true,
                        isInterest: true
                    };
                } 
            }
        }

        return {
            isOk: true,
            isInterest: false
        }
    }
    return {
        isOk: false,
        isInterest: false
    }
}
