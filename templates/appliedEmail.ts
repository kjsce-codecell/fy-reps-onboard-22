interface Data {
    email: string,
    name: string,
    registrationID: number
}

const format = (data: Data) => {
    const { email, name, registrationID } = data;

    return (
        `
        Hello!!
        `
    )
}

export default format;
