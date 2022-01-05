const itensExcluir = []


function marcar() {


    let items = document.querySelectorAll('.itemExcluir')

    items.forEach((item) => {

        item.addEventListener('click', () => {

            let id = item.getAttribute('data-id');
            let status = document.getElementById('campoStatus' + id)

            let valorStatus = 0;
            let legenda = '';

            if (item.value == 0) {

                valorStatus = 3;
                legenda = 'Concluida';


                item.value = 1

            } else {


                valorStatus = 1;
                legenda = 'Pendente';
                item.value = 0

            }

            axios.post('/concluir', {

                id: id,
                status: valorStatus

            }).then((response) => {

                status.innerHTML = legenda;

            }).catch((erro) => {

                console.log('Erro de atualização de STATUS')

            })
        })
    })


}

marcar();