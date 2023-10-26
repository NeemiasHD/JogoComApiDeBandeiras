using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuePaisEesseJogo.Models;

namespace QuePaisEesseJogo.Controllers
{
    public class PlayersController : Controller
    {
        private readonly Contexto _context;

        public PlayersController(Contexto context)
        {
            _context = context;
        }

        // GET: Players/BuscarTodos
        public async Task<IActionResult> BuscarTodos()
        {
            var players = await _context.Player.ToListAsync();
            return Json(players);
        }

        // GET: Players/BuscarUm/5
        public async Task<IActionResult> BuscarUm(int? id)
        {
            if (id == null || _context.Player == null)
            {
                return NotFound();
            }

            var player = await _context.Player.FirstOrDefaultAsync(m => m.Id == id);

            if (player == null)
            {
                return NotFound();
            }

            return Json(player);
        }

        // POST: Players/Gravar
        [HttpPost]
        public async Task<IActionResult> Gravar([FromBody] Player player)
        {
            if (ModelState.IsValid)
            {
                _context.Add(player);
                await _context.SaveChangesAsync();
                return Json(player);
            }

            return Json("Error: Unable to create player.");
        }

        // POST: Players/Alterar/5
        [HttpPost]
        public async Task<IActionResult> Alterar(int id, [FromBody] Player player)
        {
            if (id != player.Id)
            {
                return Json("Error: Invalid ID");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(player);
                    await _context.SaveChangesAsync();
                    return Json(player);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PlayerExists(player.Id))
                    {
                        return Json("Error: Player not found.");
                    }
                }
            }

            return Json("Error: Unable to update player.");
        }

        // POST: Players/Deletar/5
        [HttpPost]
        public async Task<IActionResult> Deletar(int id)
        {
            if (_context.Player == null)
            {
                return Json("Error: Entity set 'Contexto.Player' is null.");
            }

            var player = await _context.Player.FindAsync(id);
            if (player != null)
            {
                _context.Player.Remove(player);
                await _context.SaveChangesAsync();
                return Json("Player foi deletado com Sucesso");
            }

            return Json("Error: Player not found.");
        }

        private bool PlayerExists(int id)
        {
            return _context.Player?.Any(e => e.Id == id) ?? false;
        }
    }
}
