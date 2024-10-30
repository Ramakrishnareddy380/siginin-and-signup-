const zod=require ("zod")

const createTodo=zod.object({
    title:zod.string(),
    description:zod.string()
})

const UpdateTodo=zod.object({
    id:zod.string(),

})

module.export={
    createTodo:createTodo,
    UpdateTodo:UpdateTodo

}
