using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// MOZE SE NA OVOM LEVELU STAVITI [Authorize] da bi trazilo token na svim requestovima a sa [AllowAnonymous] dozvolimo pristup requestu bez tokena. ili pojedinacno stavljati [Authorize] na svaki request
[Authorize]
public class UsersController : BaseApiController
{
  private readonly IUserRepository _userRepository;
  private readonly IMapper _mapper;

  public UsersController(IUserRepository userRepository, IMapper mapper)
  {
    _mapper = mapper;
    _userRepository = userRepository;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
  {
    var users = await _userRepository.GetMembersAsync();

    return Ok(users);
  }

  [HttpGet("{username}")]
  public async Task<ActionResult<MemberDto>> GetUser(string username)
  {
    return await _userRepository.GetMemberAsync(username);
  }
}