const makeThumbnail = require('webshot'); // https://github.com/brenden/node-webshot
const path = require('path');

const renderItem = (item) => {
  return `<div style="display:block;position:absolute;overflow:hidden;width:${item.width}px;height:${item.height}px;top:${item.y}px;left:${item.x}px;-webkit-transform:translateZ(0px) rotate(${item.angle}deg);"><div style="position:absolute;display:block;overflow:hidden;width:${item.childWidth}px;height:${item.childHeight}px;top:${item.childY}px;left:${item.childX}px;-webkit-clip-path:polygon(${item.clip.map(x => x.map(z => z + 'px').join(' ')).join(',').trim()});"><iframe src="${item.url}" frameborder="0" style="position:absolute;display:block;width:100%;height:100%;"></iframe></div></div>`;
};
const thumbnail = (html, filename, width = 'window', height = 'window') => {
  return new Promise((resolve, reject) => {
    makeThumbnail(html, path.join(__dirname, '..', 'static', 'thumbnails', filename), {
      renderDelay: 15000,
      takeShotOnCallback: false,
      siteType: 'html',
      screenSize: {
        width: width,
        height: height
      },
      shotSize: {
        width: width,
        height: height
      }
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(filename);
      }
    });
  });
};

module.exports = async (filename, items, width, height, background = 'white') => {
  const delay = 15000;
  const includeJs = false;
  const js = `const iframes={elements:document.querySelectorAll('iframe'),loaded:0};iframes.elements.forEach(element=>element.addEventListener('load',()=>{iframes.loaded++;if(iframes.loaded===iframes.elements.length){setTimeout(()=>{console.log('loaded');/*window.callPhantom('takeShot');*/},${delay})}}));`;
  const html = `<html><body style="padding:0;margin:0;background-color:${background};">${items.reduce((a, item) => { return a + renderItem(item); }, '')}<script>${includeJs ? js : ''}</script></body></html>`;
  return await thumbnail(html, filename, width, height);
};
