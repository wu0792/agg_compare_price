import $ from 'jquery'
import ClipBoard from 'clipboard'

document.addEventListener('DOMContentLoaded', () => {
    new ClipBoard('#copy')

    function getIdTypeInput() {
        return document.querySelector('[name="idType"]:checked')
    }

    function getIdType() {
        let checked = getIdTypeInput()
        return checked ? checked.value : ''
    }

    function getIdInput() {
        return document.querySelector('#id')
    }

    function getId() {
        return getIdInput().value.trim()
    }

    function getFlightNumsInput() {
        return document.querySelector('#flightNums')
    }

    function getFlightNums() {
        let flightNums = getFlightNumsInput()
        return flightNums ? flightNums.value.trim() : ''
    }

    function onSubmit() {
        getIdInput().style.border = ''
        getFlightNumsInput().style.border = ''

        let idType = getIdType()

        let id = getId()
        if (!id) {
            getIdInput().style.border = 'solid 1px red'
        }

        let flightNums = getFlightNums()
        if (!flightNums) {
            getFlightNumsInput().style.border = 'solid 1px red'
        }

        if (idType && id && flightNums) {
            // alert(`idType:${idType},id:${id},flightNums:${flightNums}`)
            $.get(`http://localhost:2333/?${idType}=${id}&flights=${flightNums}`, function (data) {
                $('#result').val(JSON.stringify(data, null, 2))
            });
        }
    }

    document.querySelector('#submit').addEventListener('click', ev => {
        onSubmit()
    })
})