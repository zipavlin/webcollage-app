module.exports = {
  fitItemToMask: (item) => {
    if (item.clip.length <= 0) return item;
    // get highest x, y & lowest x, y
    let top = 999999, right = 0, bottom = 0, left = 999999;
    for (let x of item.clip) {
      // top
      if (x[1] < top) top = x[1];
      // right
      if (x[0] > right) right = x[0];
      // bottom
      if (x[1] > bottom) bottom = x[1];
      // left
      if (x[0] < left) left = x[0];
    }
    const padding = 10;
    top -= padding;
    right += padding;
    left -= padding;
    bottom += padding;

    let newWidth = right - left;
    let newHeight = bottom - top;

    // set new variables
    if (newWidth < item.width || newHeight < item.height) {
      item.width = right - left;
      item.height = bottom - top;
      item.x = item.x + left;
      item.y = item.y + top;
      item.childX = item.childX - left;
      item.childY = item.childY - top;
    }
    return item;
  },
  getRotatedPoint: (point, center, angle) => {
    const angleInRad = angle * Math.PI/180;
    return {
      x: Math.round(center.x + ((point.x - center.x) * Math.cos(angleInRad)) + ((point.y - center.y) * Math.sin(angleInRad))),
      y: Math.round(center.y - ((point.x - center.x) * Math.sin(angleInRad)) + ((point.y - center.y) * Math.cos(angleInRad)))
    };
  },
  minSize: function (items) {
    let points = [];
    const max = {
      top: 999999,
      right: 0,
      bottom: 0,
      left: 999999
    };
    // add all corners to array
    for (let item of items) {
      // get center
      const center = {
        x: (item.width / 2) + item.x,
        y: (item.height / 2) + item.y
      };
      // get corners array and set rotated
      const corners = [
        {
          x: item.x,
          y: item.y
        },
        {
          x: item.x + item.width,
          y: item.y
        },
        {
          x: item.x + item.width,
          y: item.y + item.height
        },
        {
          x: item.x,
          y: item.y + item.height
        }
      ].map(x => this.getRotatedPoint(x, center, item.angle));
      // add all rotated corners to points
      points = points.concat(corners);
    }
    // select max points
    for (let point of points) {
      // top
      if (point.y < max.top) max.top = point.y;
      // right
      if (point.x > max.right) max.right = point.x;
      // bottom
      if (point.y > max.bottom) max.bottom = point.y;
      // left
      if (point.x < max.left) max.left = point.x;
    }
    // add padding
    const padding = 10;
    max.top = max.top - padding;
    max.right = max.right + padding;
    max.left = max.left - padding;
    max.bottom = max.bottom + padding;
    // return
    return {
      width: max.right - max.left,
      height: max.bottom - max.top,
      dx: max.left,
      dy: max.top
    }
  },
  normalizeItems: function (items, minSize = null) {
    // fit all items to mask
    // TODO: check if this works
    items = items.map(x => this.fitItemToMask(x));
    // get min canvas size
    if (!minSize) {
      minSize = this.minSize(items);
    }
    // reposition all items
    items = items.map(i => {
      i.x = i.x - minSize.dx;
      i.y = i.y - minSize.dy;
      return i;
    });
    return items;
  }
};
