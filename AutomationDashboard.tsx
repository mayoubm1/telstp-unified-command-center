                              <FormLabel className="text-base">Active</FormLabel>
                              <FormDescription>
                                Enable this notification
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-notification-active"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsNotificationDialogOpen(false)}
                          data-testid="button-cancel-notification"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={createNotificationMutation.isPending}
                          data-testid="button-save-notification"
                        >
                          Create Notification
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Notifications Set</h3>
                    <p className="text-muted-foreground mb-4">
                      Create response time alerts to monitor AI platform performance
                    </p>
                    <Button onClick={() => setIsNotificationDialogOpen(true)} data-testid="button-create-first-notification">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Notification
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification) => (
                  <Card key={notification.id} data-testid={`notification-card-${notification.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Response Time Alert - {formatResponseTime(notification.thresholdMs)}
                        </CardTitle>
                        <Badge variant={notification.isActive ? "default" : "secondary"}>
                          {notification.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-sm font-medium">Threshold</Label>
                          <p className="text-sm text-muted-foreground">
                            {formatResponseTime(notification.thresholdMs)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Platform</Label>
                          <p className="text-sm text-muted-foreground">
                            {notification.platformId 
                              ? platforms.find((p) => p.id === notification.platformId)?.name || "Unknown"
                              : "All platforms"
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <h2 className="text-xl font-semibold">Response Metrics</h2>
            
            {metricsData ? (
              <div className="grid gap-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metricsData.summary.totalResponses}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatResponseTime(metricsData.summary.averageResponseTime)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metricsData.summary.successRate}%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Platform Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(metricsData.summary.platformBreakdown).map(([platformId, data]) => {
                        const platform = platforms.find((p) => p.id === platformId);
                        return (
                          <div key={platformId} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{platform?.name || "Unknown Platform"}</h3>
                              <p className="text-sm text-muted-foreground">
                                {data.count} responses • {data.successRate}% success rate
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold">
                                {formatResponseTime(data.avgTime)}
                              </div>
                              <div className="text-sm text-muted-foreground">avg time</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Metrics Available</h3>
                  <p className="text-muted-foreground">
                    Send some messages to AI platforms to see response metrics
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}