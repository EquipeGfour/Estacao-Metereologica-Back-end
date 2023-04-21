import cron from 'node-cron'

const cronScheduleToMysql = () =>{
    cron.schedule("* * * * *", () => console.log("Executando a tarefa a cada 1 minuto"));
}
export {cronScheduleToMysql}