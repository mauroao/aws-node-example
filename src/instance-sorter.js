module.exports.sort = instances => {
    instances.sort((a,b) => {
        const first = `${a.Platform} ${a.Name}`;
        const second = `${b.Platform} ${b.Name}`;
        return (first > second) ? 1 : -1;
    });
}