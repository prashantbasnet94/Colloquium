let site="http://localhost:5000/"
let axios = require("axios");

 describe("testing-server-routes", () => {
    it("user object api", async () => {
        const body= await axios.get(site+"api/auth/5feb240bd774987e52bb04be");
        expect(body.data) .toEqual({
            "_id":"5feb240bd774987e52bb04be",
            "name":"prashant Basnet",
            "email":"prashantbasnet94@gmail.com",
            "major":"Computer Science",
            "date":"2020-12-29T12:41:47.746Z",
            "__v":0
           });
        expect(body.status).toEqual(200)
        // expect(body.toString())

    });
});
