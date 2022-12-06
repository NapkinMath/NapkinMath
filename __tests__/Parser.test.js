
const { getItemListObj } = require('../server/utils/receiptParser.js');

describe('getItemListObj', () => {
  it('should return an object of itemsList and tax', () => {
    const textData = [
      {
        description: 'Fried Rice',
        boundingPoly: {
          vertices: [
            { x: 10, y: 10 },
            { x: 20, y: 10 },
            { x: 20, y: 20 },
            { x: 10, y: 20 }
          ]
        }
      },
      {
        description: '$10.00',
        boundingPoly: {
          vertices: [
            { x: 30, y: 10 },
            { x: 40, y: 10 },
            { x: 40, y: 20 },
            { x: 30, y: 20 }
          ]
        }
      },
      {
        description: 'Tax',
        boundingPoly: {
          vertices: [
            { x: 50, y: 10 },
            { x: 60, y: 10 },
            { x: 60, y: 20 },
            { x: 50, y: 20 },
          ]
        }
      },
      {
        description: '$1.50',
        boundingPoly: {
          vertices: [
            { x: 230, y: 10 },
            { x: 80, y: 10 },
            { x: 80, y: 20 },
            { x: 70, y: 20 }
          ]
        }
      }
    ];
    const expected = {
      itemsList: [
        { itemName: 'Fried Rice', itemPrice: 10 },
      ],
      tax: 1.5
    };
    console.log(getItemListObj(textData))
    expect(getItemListObj(textData)).toEqual(expected);
  });
});