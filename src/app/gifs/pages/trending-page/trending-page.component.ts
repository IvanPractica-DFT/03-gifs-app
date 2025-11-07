import {  AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})

export  default class TrendingPageComponent implements AfterViewInit{
  gifService=inject(GifService);
  ScrollStateService=inject(ScrollStateService)
  scrollDivRef= viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scroollDiv= this.scrollDivRef()?.nativeElement;

    if(!scroollDiv)return;

    scroollDiv.scrollTop=this.ScrollStateService.trendignScrollState();

  }

  onScroll(event:Event){
    const scroollDiv= this.scrollDivRef()?.nativeElement;

    if(!scroollDiv)return;

    const scrollTop = scroollDiv.scrollTop;
    const clientHeight = scroollDiv.clientHeight;
    const scrollHeigth = scroollDiv.scrollHeight;

    // console.log({scrollTotal:scrollTop+clientHeight,scrollHeigth});
    const isAtBottom= scrollTop+clientHeight+300 >= scrollHeigth;
    this.ScrollStateService.trendignScrollState.set(scrollTop);

    if (isAtBottom){
      this.gifService.loadTrendingGifs();
    }

  }
}
