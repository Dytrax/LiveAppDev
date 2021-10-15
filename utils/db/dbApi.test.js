const rewire = require("rewire")
const dbApi = rewire("./dbApi")
const DB = dbApi.__get__("DB")
// @ponicode
describe("store", () => {
    let inst

    beforeEach(() => {
        inst = new DB()
    })

    test("0", async () => {
        await inst.store("Dillenberg", 127)
    })

    test("1", async () => {
        await inst.store("Dillenberg", 241)
    })

    test("2", async () => {
        await inst.store("Elio", 161)
    })

    test("3", async () => {
        await inst.store("Elio", 243)
    })

    test("4", async () => {
        await inst.store("Elio", 159)
    })

    test("5", async () => {
        await inst.store(undefined, undefined)
    })
})

// @ponicode
describe("getData", () => {
    let inst

    beforeEach(() => {
        inst = new DB()
    })

    test("0", async () => {
        await inst.getData("Elio")
    })

    test("1", async () => {
        await inst.getData("Dillenberg")
    })

    test("2", async () => {
        await inst.getData("elio@example.com")
    })

    test("3", async () => {
        await inst.getData(undefined)
    })
})

// @ponicode
describe("removeItemValue", () => {
    let inst

    beforeEach(() => {
        inst = new DB()
    })

    test("0", async () => {
        await inst.removeItemValue("elio@example.com")
    })

    test("1", async () => {
        await inst.removeItemValue("Elio")
    })

    test("2", async () => {
        await inst.removeItemValue("Dillenberg")
    })

    test("3", async () => {
        await inst.removeItemValue(undefined)
    })
})
