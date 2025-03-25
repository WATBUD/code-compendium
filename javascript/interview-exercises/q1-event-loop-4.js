setTimeout(()=>console.log('A'),100)

new Promise(reslove => {
    console.log('B')
    reslove()
}).then(()=>console.log('C'))

setTimeout(()=>console.log('D'), 0)

async function main() {
    await Promise.resolve()
    console.log('E')
}

main()
console.log('F')