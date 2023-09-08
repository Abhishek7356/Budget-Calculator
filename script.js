



function register() {

    if (regName.value == '' || regPassword.value == '') {
        alert('please Enter details correctly');
    } else {
        const accountDetails = {};
        accountDetails.userName = regName.value;
        accountDetails.userPassword = regPassword.value;
        accountDetails.userBalance = 0;
        console.log(accountDetails);
        if (accountDetails.userName in localStorage) {
            alert('user allready registered');
        } else {
            localStorage.setItem(regName.value, JSON.stringify(accountDetails));
            localStorage.setItem(`userName${regName.value}`, regName.value);
            alert('Registration successfull.');
            location = '../';
            regName.value = '';
            regAcno.value = '';
        }
    }

}



function signin() {
    if (loginName.value == '' || loginPassword.value == '') {
        alert('please Enter details correctly');
    } else {
        if (loginName.value in localStorage) {
            let acnoDetails = JSON.parse(localStorage.getItem(loginName.value));
            // console.log(acnoDetails);
            // document.getElementById('incorrect2').style.display = 'none';
            // document.getElementById('loginAcno').style.borderBottom = '2px solid gray';
            if (loginPassword.value == acnoDetails.userPassword) {
                Acno = acnoDetails.userPassword;
                alert('Login Success');
                location = './homePage';
                let UserKey = localStorage.getItem(`userName${loginName.value}`)
                localStorage.setItem("userName", UserKey)
                localStorage.setItem("userDetails", JSON.stringify(acnoDetails));
                console.log(UserKey);
                document.getElementById('incorrect').style.display = 'none';
                document.getElementById('loginPassword').style.borderBottom = '2px solid gray';
            } else {
                document.getElementById('incorrect').style.display = 'block';
                document.getElementById('loginPassword').style.borderBottom = '2px solid red';
            }
        } else {
            document.getElementById('incorrect2').style.display = 'block';
            document.getElementById('loginAcno').style.borderBottom = '2px solid red';
        }
    }
}

function pageLoad() {
    document.getElementById('Username').innerHTML = `Welcome ${localStorage.getItem("userName")}`;
    let balance = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById('amount').innerHTML = `&#8377; ${balance.userBalance}`
}

function deposite() {
    let deposite = document.getElementById('deposite');
    let description = document.getElementById('description');
    let amount = document.getElementById('amount');
    if (deposite.value == '' || description.value == '') {
        alert('please Enter the details correctly');
    } else {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(userDetails);
        let depoAmount = Number(deposite.value);
        console.log(depoAmount);
        userDetails.userBalance += depoAmount;
        amount.innerHTML = `&#8377; ${userDetails.userBalance}`;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        alert("Amount credited succesfully")
        deposite.value = '';
        description.value = '';
    }
}

function withdraw() {
    let withdraw = document.getElementById('withdraw');
    let wpassword = document.getElementById('incomeSource');
    let amount = document.getElementById('amount');
    if (withdraw.value == '' || wpassword.value == '') {
        alert('please Enter the detailes correctly ');
    } else {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(userDetails);
        let depoAmount = Number(withdraw.value);
        console.log(depoAmount);
        userDetails.userBalance -= depoAmount;
        amount.innerHTML = `&#8377; ${userDetails.userBalance}`;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        alert("Amount Debited succesfully")
        withdraw.value = '';
        wpassword.value = '';
    }
}


function clearAll() {
    localStorage.clear();
    location = '../sighUpPage';
}