---
title: Hyperparameter Optimization
---

A UI wizard for performing optimization with ability to specify an optimization strategy, targets, parameter values and ranges, 
and experiment and time limits

This is a wizard to make it more accessible to execute hyperparameter optimization. 

The app is used to choose the base 
task whose parameters need to be optimized. If I understand correctly, discrete parameters is to choose specific values 
to try out for a parameter, and uniform parameters to choose a range of parameter values and step size between. 

In progress - HPO app
תהליך של חיפוש פרמטרים שמביאים תוצאה הכי טובה
תומכים ב-SDK אבל רוצים להנגיש בצורת UI. לבחור פרמטרים, לבחור מטריקות, לבחור אלגוריטמים

* Name 
* Base Task ID - ID of the task whose hyperparameters are going to be optimized
* Optimization Strategy - choose a strategy from a drop down menu (e.g. random, grid, Optuna)
* Concurrent Tasks - the maximum number of concurrent tasks
* Title - title for metric to optimize
* Series - series for metric to optimize
* Sign
* Queue
* Discrete parameters - discrete parameters to search
    * Parameter - parameter name
    * Values - list values to search, separated bt commas 
* Uniform Parameters - uniform parameters to search
    * Parameter - parameter name 
    * minimum value - minimum value of the parameter
    * maximum value - maximum value of the parameter
    * step size - step size between parameter values
    
* max experiments - maximum number of experiments per parameter search 
* experiments to save - number of last experiments to save
* time limit - time limit (in min) per experiment
* min iterations - minimum iterations per experiment
* max iterations - maximum iterations per experiment. 

Once launched, a few plots will appear in the app:
* Optimization objective  
* summary 
* budget
* Resources
* metrics
