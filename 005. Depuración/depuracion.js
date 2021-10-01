let m = 1,n = 2;
for (let i = 1; i <= 5; i++) {
    m = m * i;
    n = n + m * n;
}
console.log(n);