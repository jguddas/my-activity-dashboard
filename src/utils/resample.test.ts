import round from "lodash/round";
import resample from "./resample";

const roundArrArr = (arrArr: number[][]) =>
  arrArr.map((arr) => arr.map((val) => round(val, 8)));

describe("resample basic", () => {
  it("x-scale", () => {
    expect(
      roundArrArr(
        resample(
          [
            [1, 1],
            [2, 1],
          ],
          0.5
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          1,
        ],
        Array [
          1.5,
          1,
        ],
        Array [
          2,
          1,
        ],
      ]
    `);
    expect(
      roundArrArr(
        resample(
          [
            [1, 1],
            [2, 1],
          ],
          0.2
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          1,
        ],
        Array [
          1.2,
          1,
        ],
        Array [
          1.4,
          1,
        ],
        Array [
          1.6,
          1,
        ],
        Array [
          1.8,
          1,
        ],
        Array [
          2,
          1,
        ],
      ]
    `);
  });
  it("y-scale", () => {
    expect(
      roundArrArr(
        resample(
          [
            [1, 1],
            [2, 2],
          ],
          0.2
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          1,
        ],
        Array [
          1.2,
          1.2,
        ],
        Array [
          1.4,
          1.4,
        ],
        Array [
          1.6,
          1.6,
        ],
        Array [
          1.8,
          1.8,
        ],
        Array [
          2,
          2,
        ],
      ]
    `);
  });
});

describe("resample multipoint", () => {
  it("x-scale", () => {
    expect(
      roundArrArr(
        resample(
          [
            [1, 1],
            [2, 1],
            [4, 1],
          ],
          0.5
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          1,
        ],
        Array [
          1.5,
          1,
        ],
        Array [
          2,
          1,
        ],
        Array [
          2.5,
          1,
        ],
        Array [
          3,
          1,
        ],
        Array [
          3.5,
          1,
        ],
        Array [
          4,
          1,
        ],
      ]
    `);
  });
  it("y-scale", () => {
    expect(
      roundArrArr(
        resample(
          [
            [1, 1],
            [2, 2],
            [3, 4],
          ],
          0.5
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          1,
        ],
        Array [
          1.5,
          1.5,
        ],
        Array [
          2,
          2,
        ],
        Array [
          2.5,
          3,
        ],
        Array [
          3,
          4,
        ],
      ]
    `);
  });
});

describe("resample floats", () => {
  it("x-scale", () => {
    expect(
      roundArrArr(
        resample(
          [
            [1.1, 1],
            [2.1, 1],
          ],
          0.5
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1.5,
          1,
        ],
        Array [
          2,
          1,
        ],
      ]
    `);
  });
  it("y-scale", () => {
    expect(
      roundArrArr(
        resample(
          [
            [1, 1.1],
            [2, 2.1],
          ],
          0.2
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          1.1,
        ],
        Array [
          1.2,
          1.3,
        ],
        Array [
          1.4,
          1.5,
        ],
        Array [
          1.6,
          1.7,
        ],
        Array [
          1.8,
          1.9,
        ],
        Array [
          2,
          2.1,
        ],
      ]
    `);
  });
});
