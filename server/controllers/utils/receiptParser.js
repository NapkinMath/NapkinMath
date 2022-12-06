function seperateLines(textData) {
  const sortedTextData = textData.sort((a, b) => {
    return a.boundingPoly.vertices[0].y - b.boundingPoly.vertices[0].y;
  });
  const resultsArr = [];
  let startY = sortedTextData[0].boundingPoly.vertices[0].y;
  let subArr = [];
  for (let data of sortedTextData) {
    let currY = data.boundingPoly.vertices[0].y;
    if (Math.abs(currY - startY) < 10) {
      subArr.push(data);
    } else {
      resultsArr.push(
        subArr.sort((a, b) => {
          return a.boundingPoly.vertices[0].x - b.boundingPoly.vertices[0].x;
        })
      );
      subArr = [data];
      startY = currY;
    }
  }
  return resultsArr;
}

function getItemListObj(textData) {
  const arrOfLines = seperateLines(textData);
  const itemPricesArr = [];
  for (let line of arrOfLines) {
    const itemObj = {};
    let itemStr = '';
    for (let i = line.length - 1; i >= 0; i--) {
      if (
        !isNaN(Number(line[i].description)) &&
        itemObj.itemPrice === undefined
      ) {
        for (let j = 0; j < line[i].description.length; j++) {
          if (line[i].description[j] === '.') {
            itemObj.itemPrice = Number(line[i].description);
            break;
          }
        }
      }
      if (
        itemObj.itemPrice !== undefined &&
        Number(line[i].description) !== itemObj.itemPrice &&
        line[i].description.trim() !== '$'
      ) {
        //if(line[i].description.toLowerCase().trim() == 'total' || line[i].description.toLowerCase().trim() == 'subtotal' || line[i].description.toLowerCase().trim() == 'balance' || line[i].description.toLowerCase().trim() == 'amount')
        itemStr = line[i].description + ' ' + itemStr;
      }
    }
    if (itemStr !== '') itemObj.itemName = itemStr.trim();
    if (Object.keys(itemObj).length) itemPricesArr.push(itemObj);
  }
  const resultsArr = [];
  for (let i = 0; i < itemPricesArr.length; i++) {
    if (
      itemPricesArr[i].itemName
        .toLowerCase()
        .includes('total' || 'balance' || 'amount')
    )
      break;
    resultsArr.push(itemPricesArr[i]);
  }

  let tax;

  for (let i = itemPricesArr.length - 1; i >= 0; i--) {
    if (itemPricesArr[i].itemName.toLowerCase().includes('tax')) {
      tax = itemPricesArr[i].itemPrice;
    }
  }
  return { itemsList: resultsArr, tax };
}

module.exports = getItemListObj;
