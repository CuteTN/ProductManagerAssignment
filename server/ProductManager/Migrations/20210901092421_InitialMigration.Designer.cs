﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProductManager.DAL;

namespace ProductManager.Migrations
{
  [DbContext(typeof(DAL.AppDbContext))]
  [Migration("20210901092421_InitialMigration")]
  partial class InitialMigration
  {
    protected override void BuildTargetModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
      modelBuilder
          .HasAnnotation("Relational:MaxIdentifierLength", 128)
          .HasAnnotation("ProductVersion", "5.0.9")
          .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

      modelBuilder.Entity("ProductManager.Models.Product", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<string>("Description")
                      .HasMaxLength(250)
                      .HasColumnType("nvarchar(250)");

            b.Property<DateTime>("DiscontinuedDate")
                      .HasColumnType("datetime2");

            b.Property<string>("Name")
                      .IsRequired()
                      .HasMaxLength(250)
                      .HasColumnType("nvarchar(250)");

            b.Property<double>("Price")
                      .HasColumnType("float");

            b.Property<short>("Rating")
                      .HasColumnType("smallint");

            b.Property<DateTime>("ReleaseDate")
                      .HasColumnType("datetime2");

            b.HasKey("Id");

            b.ToTable("Products");
          });
#pragma warning restore 612, 618
    }
  }
}
