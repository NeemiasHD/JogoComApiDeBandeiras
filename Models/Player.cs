using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuePaisEesseJogo.Models
{

    [Table("Players")]
    public class Player
    {
        [Column("Id")]
        [Display(Name= "ID")]
        public int Id { get; set; }
        [Column("Nome")]
        [Display(Name = "NOME")]
        public string Nome { get; set; }
        [Column("Pontuacao")]
        [Display(Name = "PONTUAÇÃO")]
        public int Pontuacao { get; set; }
    }
}
