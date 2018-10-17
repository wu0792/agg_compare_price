import $ from 'jquery'
import ClipBoard from 'clipboard'

document.addEventListener('DOMContentLoaded', () => {
    new ClipBoard('#copy');

    (function init() {
        let idType = localStorage.getItem('idType') || 'tid'
        let id = localStorage.getItem('id')
        let flightNums = localStorage.getItem('flightNums')
        let result = localStorage.getItem('result')

        $(`#${idType}`).click()
        $('#id').val(id)
        $('#flightNums').val(flightNums)
        $('#result').val(result)
    })()

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
            $('#result').val('')
            $('#msg').html('查询中，请耐心等待...')
            const url = `http://dst89539:2333/?${idType}=${id}&flightNums=${flightNums}`
            $.get(url, function (data) {
                $('#msg').html('')
                let result = JSON.stringify(data, null, 2)
                $('#result').val(result)
                localStorage.setItem('result', result)
                $('#copy').click()
            }).catch(err => {
                $('#msg').html('查询出错')
            });
        }
    }

    function onCopySuccess() {
        $('#msg').html('已复制查询结果')
    }

    getIdInput().bind('blur', ev => {
        let value = ev.target.value = ev.target.value.trim().toLowerCase()
        localStorage.setItem('id', value)
    }).bind('keydown', ev => {
        if (ev.keyCode === 13) {
            getFlightNumsInput().focus()
        }
    })

    getFlightNumsInput().bind('blur', ev => {
        let flightNums = ev.target.value = ev.target.value.trim().toUpperCase().replace(/[;；，]/g, ',')
        localStorage.setItem('flightNums', flightNums)
    }).bind('keydown', ev => {
        if (ev.keyCode === 13) {
            onSubmit()
        }
    })

    $('input[type="text"],textarea').bind('focus', ev => ev.target.select())

    $('[name="idType"]').bind('click', ev => {
        localStorage.setItem('idType', $(ev.target).attr('id'))
        getIdInput().focus()
    })

    $('#copy').bind('click', ev => {
        onCopySuccess()
    })

    $('#submit').bind('click', ev => {
        onSubmit()
    })
})