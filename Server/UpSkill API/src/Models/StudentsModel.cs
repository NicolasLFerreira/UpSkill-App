using System.ComponentModel.DataAnnotations;

namespace UpSkill_API.Models
{
    public class StudentsModel
    {
        [Key]
        public int StudentId { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string? FirstName { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string? LastName { get; set; }
        [Required]
        public string? YearLevel { get; set; }
        [Required]
        public string? DOB { get; set; } // Date of Birth
        [Required]
        public string? Ethnicity { get; set; }
        [Required]
        public string? Tutor { get; set; }
        [Required]
        public byte AreaOfNeed { get; set; } // 5 items.
        [Required]
        public string? Diagnosis { get; set; }
        [Required]
        public string? ExternalAgencies { get; set; }
        [Required]
        public byte Response { get; set; } // 6 items.
        [Required]
        public byte SAC { get; set; } // 5 items.
        [Required]
        public string? Notes { get; set; } // Potential to be the biggest field.
        [Required]
        public string? Links { get; set; } // Links to a google file. Gotta add some safety checks here.
        [Required]
        public string? KamarUpdates { get; set; }
        [Required]
        public string? Pronoun { get; set; }
        [Required]
        public string? SACInfo { get; set; }
        [Required]
        public string? OtherInfo { get; set; }
    }
}
