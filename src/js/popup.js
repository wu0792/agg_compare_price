import $ from 'jquery'
import ClipBoard from 'clipboard'

document.addEventListener('DOMContentLoaded', () => {
    new ClipBoard('#copy')

    function getIdTypeInput() {
        return $('[name="idType"]:checked')
    }

    function getIdType() {
        let checked = getIdTypeInput()
        return checked ? checked.attr('id') : ''
    }

    function getIdInput() {
        return $('#id')
    }

    function getId() {
        return getIdInput().val().trim()
    }

    function getFlightNumsInput() {
        return $('#flightNums')
    }

    function getFlightNums() {
        let flightNums = getFlightNumsInput()
        return flightNums ? flightNums.val().trim() : ''
    }

    function onSubmit() {
        getIdInput().css('border', '')
        getFlightNumsInput().css('border', '')

        let idType = getIdType()

        let flightNums = getFlightNums()
        if (!flightNums) {
            getFlightNumsInput().css('border', '2px solid #fb4c4c').focus()
        }

        let id = getId()
        if (!id) {
            getIdInput().css('border', '2px solid #fb4c4c').focus()
        }

        if (idType && id && flightNums) {
            $('#result').html('')
            $('#msg').html('查询中，请耐心等待...')
            const url = `http://localhost:2333/?${idType}=${id}&flights=${flightNums}`
            $.get(url, function (data) {
                $('#msg').html('')
                $('#result').html(JSON.stringify(data, null, 2))
                $('#copy').click()
            }).catch(err => {
                $('#msg').html('查询出错')
            });
        }
    }

    function onCopySuccess() {
        $('#msg').html('已经复制')
    }

    getIdInput().bind('blur', ev => {
        ev.target.value = ev.target.value.trim().toLowerCase()
    }).bind('keydown', ev => {
        if (ev.keyCode === 13) {
            getFlightNumsInput().focus()
        }
    })

    getFlightNumsInput().bind('blur', ev => {
        ev.target.value = ev.target.value.trim().toUpperCase().replace(/[;；，]/g, ',')
    }).bind('keydown', ev => {
        if (ev.keyCode === 13) {
            onSubmit()
        }
    })

    $('[name="idType"]').bind('change', ev => {
        getIdInput().focus()
    })

    $('#copy').bind('click', ev => {
        onCopySuccess()
    })

    $('#submit').bind('click', ev => {
        onSubmit()
    })
})