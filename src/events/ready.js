export default async (client) => {
        await client.user.setPresence({
            status: 'online'
        })
        console.log(`[SYS]! ${await client.user.username} Start success`)
}