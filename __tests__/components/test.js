import deepFreeze from 'deep-freeze'
import renderer from 'react-test-renderer'
import {renderDefaultButton, renderCustomDefaultButton}  from '../../src/components/'

describe("Test shared component functions",() => {

    it("Test renderDefaultButton", () => {
        const params = {
            width: "100px",
            disabled: true,
            text: "bonjour", 
            backgroundColor: "red",
            className: "", 
            onClickFunc: ""
        }
        deepFreeze(params)
        const rendered = renderer.create(renderDefaultButton(params))
        console.log(rendered.toJSON())
        expect().toEqual({})
    })
})