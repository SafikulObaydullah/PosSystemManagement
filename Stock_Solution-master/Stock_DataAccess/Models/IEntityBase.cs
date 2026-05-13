namespace Stock_DataAccess.Models
{
    public interface IEntityBase
    {
        int Id { get; set; }
    }
    public enum MovieCategory
    {
        Action = 1,
        Comedy,
        Drama,
        Documentary,
        Cartoon,
        Horror
    }
}