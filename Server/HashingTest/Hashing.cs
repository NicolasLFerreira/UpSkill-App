using Microsoft.AspNetCore.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace HashingTest
{
    public class Hashing
    {
        public string?[] Hasher(string password)
        {
            Random random = new Random();
            byte[] salt = new byte[32];

            for (int i = 0; i < salt.Length; i++)
            {
                salt[i] = (byte)random.Next();
            }

            return new string[2] { BitConverter.ToString(KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA512, 512, 32)).Replace("-", ""), BitConverter.ToString(salt).Replace("-", "") };
        }
    }
}