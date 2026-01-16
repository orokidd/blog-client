export default function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

export function formatDateShort(date) {
    return new Date(date).toLocaleDateString('en-GB', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    })
}

export function formatDateSimple(date) {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.getMonth() // returns month in numbers 0-11
    const year = newDate.getFullYear()

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const formattedDate = `${monthNames[month]} ${day}, ${year}`

    return formattedDate
}