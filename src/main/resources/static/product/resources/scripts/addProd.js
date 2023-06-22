const addProductForm=window.document.getElementById('addProductForm');
const id = parseInt(window.location.href.split('/').at(-1).split('?')[0]);

function capacityHandleOnChange(e) {
    // options에서 selected 된 element의 text 찾기
    const texts = [...e.options]
        .filter(option => option.selected)
        .map(option => option.text);

    // 선택된 데이터 출력
    document.getElementById('capacityTexts').innerText = texts;
}


function categoryHandleOnChange(e) {
    // options에서 selected 된 element의 text 찾기
    const texts = [...e.options]
        .filter(option => option.selected)
        .map(option => option.text);

    // 선택된 데이터 출력
    document.getElementById('categoryTexts').innerText = texts;
}


function capacityAppend(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `./appendOption?text=${addProductForm['appendCapacity'].value}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseJson = JSON.parse(xhr.responseText);
                console.log(responseJson['result']);
                switch (responseJson['result']) {
                    case 'success':
                        alert('옵션 추가 완료');
                        break;
                    default:
                        alert('알 수 없는 이유로 옵션을 추가하지 못했습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
                alert('중복된 값, 빈 값이거나 서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send();
}



addProductForm.onsubmit = e =>{
    e.preventDefault();
    if (addProductForm['prodName'].value === '') {
        alert('상품이름을 입력해주세요.');
        addProductForm['prodName'].focus();
        return;
    }
    if (addProductForm['costPrice'].value === '') {
        alert('상품원가를 입력해주세요.');
        addProductForm['costPrice'].focus();
        return;
    }
    if (addProductForm['netPrice'].value === '') {
        alert('상품정가를 입력해주세요.');
        addProductForm['netPrice'].focus();
        return;
    }
    if (addProductForm['prodImage'].value === '') {
        alert('상품사진은 필수 사항입니다.');
        addProductForm['prodImage'].focus();
        return;
    }
    if (!addProductForm['prodDetailImage'].files[0]) {
        alert('상품 상세사진은 필수 사항입니다.');
        addProductForm['prodDetailImage'].focus();
        return;
    }
    if (addProductForm['stock'].value==='') {
        alert('상품사진은 필수 사항입니다.');
        addProductForm['stock'].focus();
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('prodName',addProductForm['prodName'].value);
    formData.append('costPrice',addProductForm['costPrice'].value);
    formData.append('prodCapacity',addProductForm['prodCapacity'].value)
    formData.append('prodCategory',addProductForm['prodCategory'].value);
    formData.append('netPrice',addProductForm['netPrice'].value);
    formData.append('prodImage',addProductForm['prodImage'].files[0]);
    formData.append('prodDetailImage',addProductForm['prodDetailImage'].files[0]);
    formData.append('stock',addProductForm['stock'].value);

    xhr.open('POST', './addProd');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseJson = JSON.parse(xhr.responseText);
                console.log(responseJson['result']);
                switch (responseJson['result']) {
                    case 'success':
                        // cover.show();
                        // cover.hide();
                        alert('상품 추가가 완료되었습니다.');
                        break;
                    default:
                        alert('상품을 추가하지 못하였습니다. 상품 정보를 정확히 입력해 주십시오.');
                        break;
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
}


modifyProductForm.onsubmit = e =>{
    e.preventDefault();
    if (addProductForm['prodName'].value === '') {
        alert('상품이름을 입력해주세요.');
        addProductForm['prodName'].focus();
        return;
    }
    if (addProductForm['costPrice'].value === '') {
        alert('상품원가를 입력해주세요.');
        addProductForm['costPrice'].focus();
        return;
    }
    if (addProductForm['netPrice'].value === '') {
        alert('상품정가를 입력해주세요.');
        addProductForm['netPrice'].focus();
        return;
    }
    if (addProductForm['prodImage'].value === '') {
        alert('상품사진은 필수 사항입니다.');
        addProductForm['prodImage'].focus();
        return;
    }
    if (!addProductForm['prodDetailImage'].files[0]) {
        alert('상품 상세사진은 필수 사항입니다.');
        addProductForm['prodDetailImage'].focus();
        return;
    }
    if (addProductForm['stock'].value==='') {
        alert('재고는 필수 사항입니다.');
        addProductForm['stock'].focus();
        return;
    }

    const xhr = new XMLHttpRequest();

    const formData = new FormData();
    formData.append('prodName',addProductForm['prodName'].value);
    formData.append('costPrice',addProductForm['costPrice'].value);
    formData.append('prodCapacity',addProductForm['prodCapacity'].value)
    formData.append('prodCategory',addProductForm['prodCategory'].value);
    formData.append('netPrice',addProductForm['netPrice'].value);
    formData.append('prodImage',addProductForm['prodImage'].files[0]);
    formData.append('prodDetailImage',addProductForm['prodDetailImage'].files[0]);

    formData.append('stock',addProductForm['stock'].value);


    xhr.open('POST', './modifyProdDetail/'+id);
    // console.log()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseJson = JSON.parse(xhr.responseText);
                console.log(responseJson['result']);
                switch (responseJson['result']) {
                    case 'success':
                        // cover.show();
                        // cover.hide();
                        alert('상품 추가가 완료되었습니다.');
                        break;
                    default:
                        alert('상품을 추가하지 못하였습니다. 상품 정보를 정확히 입력해 주십시오.');
                        break;
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
}


//TODO: 기존의 이미지를 기본값으로 설정하는 코드. 퍼오기만 한 상태임. 수정 필요


function loadURLToInputFiled(url){
    getImgURL(url, (imgBlob)=>{
        // Load img blob to input
        // WIP: UTF8 character error
        let fileName = 'hasFilename.jpg'
        let file = new File([imgBlob], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
        let container = new DataTransfer();
        container.items.add(file);
        document.querySelector('#file_input').files = container.files;
    })
}

// xmlHTTP return blob respond
function getImgURL(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}