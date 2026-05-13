namespace Stock_API.Utility
{
    public  class ModelsMessage:IModelMessage 
    { 
        public string Message { get; set; } = "";
        public object EntityModel { get; set; } 
    }
}
