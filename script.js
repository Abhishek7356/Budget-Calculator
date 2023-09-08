



function register() {

    if (regName.value == '' || regPassword.value == '') {
        alert('please Enter details correctly');
    } else {
        const accountDetails = {};
        accountDetails.userName = regName.value;
        accountDetails.userPassword = regPassword.value;
        accountDetails.userBalance = 0;
        accountDetails.income = 0;
        accountDetails.expense = 0;
        console.log(accountDetails);
        if (accountDetails.userName in localStorage) {
            alert('user allready registered');
        } else {
            localStorage.setItem(regName.value, JSON.stringify(accountDetails));
            alert('Registration successfull.');
            location = '../';
            regName.value = '';
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
                localStorage.setItem("userName", loginName.value)
                alert('Login Success');
                location = './homePage';
                localStorage.setItem("userDetails", JSON.stringify(acnoDetails));
                document.getElementById('incorrect').style.display = 'none';
                document.getElementById('loginPassword').style.borderBottom = '2px solid gray';
            } else {
                // document.getElementById('incorrect').style.display = 'block';
                // document.getElementById('loginPassword').style.borderBottom = '2px solid red';
            }
        } else {
            // document.getElementById('incorrect2').style.display = 'block';
            // document.getElementById('loginAcno').style.borderBottom = '2px solid red';
        }
    }
}

function pageLoad() {
    document.getElementById('Username').innerHTML = `Welcome ${localStorage.getItem("userName")}`;
    let balance = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById('amount').innerHTML = `&#8377; ${balance.userBalance}`
    document.getElementById('incomeAmount').innerHTML = `&#8377; ${balance.income}`
    document.getElementById('expenseAmount').innerHTML = `&#8377; ${balance.expense}`
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
        userDetails.income += depoAmount;
        amount.innerHTML = `&#8377; ${userDetails.userBalance}`;
        incomeAmount.innerHTML = `&#8377; ${userDetails.income}`;
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
        userDetails.expense += depoAmount;
        amount.innerHTML = `&#8377; ${userDetails.userBalance}`;
        expenseAmount.innerHTML = `&#8377; ${userDetails.expense}`;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        alert("Amount Debited succesfully")
        withdraw.value = '';
        wpassword.value = '';
    }
}

function resetBalance(balanceType) {
    let userDetailes = JSON.parse(localStorage.getItem("userDetails"));
    userDetailes[balanceType] = 0;
    expenseAmount.innerHTML = `&#8377; ${userDetailes.expense}`;
    incomeAmount.innerHTML = `&#8377; ${userDetailes.income}`;
    localStorage.setItem("userDetails", JSON.stringify(userDetailes));

}


function clearAll() {
    localStorage.clear();
    location = '../sighUpPage';
}