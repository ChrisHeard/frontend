// src/app/model-builder/model-builder.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../config/config.service';

@Component({
  standalone: true,
  selector: 'app-modelbuilder',
  templateUrl: './modelbuilder.component.html',
  styleUrls: ['./modelbuilder.component.scss'],
  imports: [JsonPipe, FormsModule, CommonModule]

})


export class ModelBuilder implements OnInit {
  ticker = '';
  symbols: any[] = [];
  result: any;

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.loadSymbols();
  }

  loadSymbols() {
    this.configService.getSymbols().subscribe({
      next: (data) => {
        this.symbols = data;
      },
      error: (err) => {
        console.error('Error loading symbols:', err);
      }
    });
  }

  getFinancialData() {
    if (this.ticker) {
      this.configService.getFinancialData(this.ticker).subscribe({
        next: (data) => {
          this.result = data;
        },
        error: (err) => {
          this.result = null;
          console.error('Error:', err);
        }
      });
    }
  }
}