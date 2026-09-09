/*
    reference: OpenTESArena/OpenTESArena/src/Rendering/RenderLightManager.cpp
    inside RenderLightManager::update(), the player light follows the camera:

    if (playerHasLight)
    {
        this->playerLight.position = camera.floatingWorldPoint;

        if (isFogActive)
        {
            this->playerLight.startRadius = ArenaRenderUtils::PLAYER_FOG_LIGHT_START_RADIUS;
            this->playerLight.endRadius = ArenaRenderUtils::PLAYER_FOG_LIGHT_END_RADIUS;
        }
        else
        {
            this->playerLight.startRadius = ArenaRenderUtils::PLAYER_LIGHT_START_RADIUS;
            this->playerLight.endRadius = ArenaRenderUtils::PLAYER_LIGHT_END_RADIUS;
        }

        visibleLights.emplace_back(this->playerLight);
    }
*/
class LightingDrawComponent extends Component {
    draw(ctx) {
        const playerLight = this.gameObject.playerLight
        let playerPosition = this.gameObject.player.components[0].position
        playerLight.position = playerPosition
        
        playerLight.startRadius = 150
        playerLight.endRadius = 320

        


        ctx.beginPath()
        ctx.save()
        ctx.arc(playerLight.position.x, playerLight.position.y, playerLight.endRadius, 0, 2 * Math.PI)
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
        const gradient = ctx.createRadialGradient(playerLight.position.x, playerLight.position.y, playerLight.startRadius, playerLight.position.x, playerLight.position.y, playerLight.endRadius)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)')
        ctx.fillStyle = gradient
        ctx.fill()
        // whats left to do is darken the outside area beyond the light's end radius
        // which ive gotta figure out
        
        
        // will use ray casting object detection to determine light obstruction
        
        ctx.restore()
    }
}