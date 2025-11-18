                          </Badge>
                        )}
                        {msg.metadata?.responseTime && (
                          <Badge variant="outline" className="text-xs">
                            {msg.metadata.responseTime}ms
                          </Badge>
                        )}
                      </div>
                      <Card className={cn(
                        "p-3",
                        msg.isChained && "border-primary/50 bg-primary/5"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          
          {/* Live WebSocket Messages */}
          {wsMessages.map((wsMsg, index) => (
            <div key={`ws-${index}`} className="space-y-2">
              {wsMsg.type === "platform_response" && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>New response from {wsMsg.payload.platform.name}...</span>
                </div>
              )}
              {wsMsg.type === "chained_response" && (
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <i className="fas fa-link"></i>
                  <span>
                    {wsMsg.payload.targetPlatform.name} responding to {wsMsg.payload.sourcePlatform.name}...
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-6">
        {/* File Upload Preview */}
        {uploadedFile && (
          <div className="mb-4" data-testid="file-preview">
            <Card className="p-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-file-pdf text-red-500"></i>
                <div className="flex-1">
                  <p className="text-sm font-medium" data-testid="file-name">
                    {uploadedFile.originalName}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid="file-size">
                    {Math.round(uploadedFile.size / 1024)} KB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={removeFile}
                  data-testid="button-remove-file"
                >
                  <i className="fas fa-times text-muted-foreground"></i>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Input Controls */}
        <div className="flex items-end space-x-4">
          {/* File Upload Button */}
          <div className="relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              data-testid="input-file-upload"
            />
            <Button variant="ghost" size="sm" data-testid="button-file-upload">
              <i className="fas fa-paperclip text-muted-foreground"></i>
            </Button>
          </div>

          {/* Voice Recording Button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? "bg-red-500 text-white" : ""}
            data-testid="button-voice-recording"
          >
            <i className={`fas ${isRecording ? "fa-stop" : "fa-microphone"} ${isRecording ? "" : "text-muted-foreground"}`}></i>
          </Button>

          {/* Main Input Field */}
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message to send to all connected AI platforms..."
              className="resize-none min-h-[3rem] max-h-[150px]"
              data-testid="input-message"
            />
          </div>

          {/* Send Button */}
          <Button 
            onClick={handleSend}
            disabled={!message.trim() || sendMessageMutation.isPending}
            data-testid="button-send"
          >
            {sendMessageMutation.isPending ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="ghost" size="sm" data-testid="button-ai-enhance">
            <i className="fas fa-magic mr-1"></i>
            <span className="text-xs">AI Enhance</span>