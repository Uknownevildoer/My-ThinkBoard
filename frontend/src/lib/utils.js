export function formatDate(date){
    return date.toLocaleDateString("en-Us",{
        month: "short",
        day: "numeric",
        year:"numeric"
    });
}