/**
 * The algorithm described the the paper used to generate 10 "valid" data points.
 */
export const cmAlg = () => {
  let scaled = [];
  do {
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push(Math.random())
    }
    const sum = data.reduce((a, b) => a + b, 0)
    scaled = data.map(x => x * (100 / sum))
  } while (!valid(scaled))
  //consvert into object format for easier plotting
  const marked = scaled.map(x => {
    return {
      marked: false,
      val: x
    }
  })
  //randomly choose two index to mark
  let {m1, m2} = [0, 0];
  do {
    m1 = Math.floor(Math.random() * 10);
    m2 = Math.floor(Math.random() * 10);
  } while (m1 === m2)//must be two different markers
  marked[m1].marked = true;
  marked[m2].marked = true;
  return marked
}

function valid(data) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  return (3 < min) && (max < 39)
}