const data = [
  {
    "clip":[
      [20,21],
      [19,93],
      [261,96],
      [255,25]
    ],
    "height":95,
    "url":"http://animejs.com/",
    "width":262,
    "x":741,
    "y":345,
    "childWidth":280,
    "childHeight":382,
    "childX":-9,
    "childY":-11,
    "state":null,
    "angle":-7
  },
  {
    "url":"http://notifinio.com",
    "width":235,
    "height":72,
    "x":830,
    "y":389,
    "clip":[
      [843,527],
      [843,579],
      [1058,578],
      [1057,528]
    ],
    "angle":0,
    "state":null,
    "childWidth":1920,
    "childHeight":947,
    "childX":-833,
    "childY":-517
  },
  {
    "url":"http://rogerdudler.github.io/git-guide/",
    "width":199,
    "height":229,
    "x":677,
    "y":389,
    "clip":[
      [600,3161],
      [594,3227],
      [608,3288],
      [628,3287],
      [627,3324],
      [652,3332],
      [659,3361],
      [706,3366],
      [715,3345],
      [757,3350],
      [756,3316],
      [742,3286],
      [768,3285],
      [773,3264],
      [770,3195],
      [761,3184],
      [675,3181],
      [666,3157]
    ],
    "angle":0,
    "state":null,
    "childWidth":1920,
    "childHeight":3437,
    "childX":-584,
    "childY":-3147
  }
];

const fitItemToMask = (item) => {
  if (item.clip.length <= 0) return item;
  // get highest x, y & lowest x, y
  let top = item.height, right = 0, bottom = 0, left = item.width;
  item.clip.forEach(x => {
    // top
    if (x[1] < top) top = x[1];
    // right
    if (x[0] > right) right = x[0];
    // bottom
    if (x[1] > bottom) bottom = x[1];
    // left
    if (x[0] < left) left = x[0];
  });
  const padding = 10;
  top -= padding;
  right += padding;
  left -= padding;
  bottom += padding;

  // set new variables
  item.width = right - left;
  item.height = bottom - top;
  item.x = item.x + left;
  item.y = item.y + top;
  item.childX = item.childX - left;
  item.childY = item.childY - top;
  return item;
};

const helper = {
  degToRad: (deg) => {
    return deg * Math.PI/180;
  },
  radToDeg: (rad) => {
    return rad * 180/Math.PI;
  },
  newSize: function (size, angle) {
    // bind helper
    const h = this;
    // org angle of c
    const org = {
      a: size.height / 2,
      b: size.width / 2,
      c: Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.b, 2)),
      alpha: h.radToDeg(Math.atan(this.a / this.b))
    };
    const newA = org.c * Math.sin(h.degToRad(org.angle + angle));
    const newB = org.c * Math.cos(h.degToRad(org.angle - angle));

    return {
      width: newB * 2,
      height: newA * 2
    }
  }

};

module.exports = (items) => {
  // fit all items to mask
  items.map(x => fitItemToMask(x));
  // fit canvas to items

};
