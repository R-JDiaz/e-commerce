import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdminHeroMetric } from '../admin-dashboard.types';

@Component({
  selector: 'app-admin-content-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-content-hero.html',
  styleUrl: './admin-content-hero.scss',
})
export class AdminContentHeroComponent {
  @Input() activeSectionLabel = '';
  @Input() activeSectionDescription = '';
  @Input() metrics: AdminHeroMetric[] = [];
}
