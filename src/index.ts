import {
    Context,
    Schema
} from 'koishi'

export const name = 'deepseek-balance'

export interface Config {
    Token: string
}

export const Config: Schema < Config > = Schema.object({
    Token: Schema.string().description("这里填写你的deepseek的api key").required()
})

export function apply(ctx: Context, config: Config) {
    ctx.command("ds余额查询").alias("ds")
        .action(async () => {
            const head = {
                "Accept": "application/json",
                "Authorization": `Bearer ${config.Token}`
            };
            let data = await ctx.http("get", "https://api.deepseek.com/user/balance", {
                headers: head
            })
            return "Deepseek剩余余额还有" + data.data.balance_infos[0].total_balance + "元"
        })
}
