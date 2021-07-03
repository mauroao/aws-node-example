const getTagValue = (tags, key) => {
    tag = tags.filter(tag => tag.Key == key)[0];
    if (tag) {
        return tag.Value;
    }
    return null;
}

module.exports.parse = (response) => {
    return     response.Reservations
    .map(item => item.Instances[0])
    .map(item => (
    {
        InstanceId: item.InstanceId,
        InstanceType: item.InstanceType,
        State: item.State.Name,
        Platform: item.Platform || 'linux',
        PublicDnsName: item.PublicDnsName,
        PublicIpAddress: item.PublicIpAddress,                
        Name: getTagValue(item.Tags, 'Name'),
        Owner: getTagValue(item.Tags, 'Owner'),
        MonitorType: getTagValue(item.Tags, 'MonitorType')
    }));
};