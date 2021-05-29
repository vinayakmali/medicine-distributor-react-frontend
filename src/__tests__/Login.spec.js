import data from "../data"

test('Login Test', ()=>{
  expect(data).toMatchSnapshot();
})

