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
            getIdInput().style.border = '2px solid #fb4c4c'
        }

        let flightNums = getFlightNums()
        if (!flightNums) {
            getFlightNumsInput().style.border = '2px solid #fb4c4c'
        }

        if (idType && id && flightNums) {
            $('#result').val('')
            $('#wait').show().html('查询中，请耐心等待...')
            const url = `http://localhost:2333/?${idType}=${id}&flights=${flightNums}`
            $.get(url, function (data) {
                $('#wait').hide()
                $('#result').val(JSON.stringify(data, null, 2))
            }).catch(err => {
                $('#wait').html('查询出错')
            });
        }
    }

    document.querySelector('#submit').addEventListener('click', ev => {
        onSubmit()
    })
})